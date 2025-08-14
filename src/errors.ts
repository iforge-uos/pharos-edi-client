/**
 * Base class for all Pharos EDI client errors
 */
export abstract class PharosError extends Error {
  abstract readonly code: string;

  constructor(
    message: string,
    public readonly originalError?: Error,
  ) {
    super(message);
    this.name = this.constructor.name;

    // Maintains proper stack trace for where our error was thrown (only available on V8)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

/**
 * Thrown when a card is not found in the system
 */
export class CardNotFound extends PharosError {
  readonly code = "CARD_NOT_FOUND";

  constructor(
    public readonly cardId: string,
    originalError?: Error,
  ) {
    super(`Card was not found. Card Id: ${cardId}`, originalError);
  }
}

/**
 * Thrown for general internal server errors from Pharos
 */
export class PharosInternalError extends PharosError {
  readonly code = "INTERNAL_ERROR";

  constructor(message = "An internal server error occurred", originalError?: Error) {
    super(message, originalError);
  }
}

/**
 * Interface for SOAP fault details
 */
export interface SoapFaultDetail {
  Code?: {
    Value: string;
    Subcode?: {
      Value: string;
    };
  };
  Reason?: {
    Text: string | { $value: string };
  };
  Detail?: any;
}

/**
 * Parses SOAP fault information and throws appropriate custom errors
 */
export function handleSoapFault(fault: SoapFaultDetail): never {
  // Extract fault information
  let code = "";
  let message = "";
  const detail = fault.Detail;

  // Handle SOAP 1.1 and 1.2 fault formats
  if (fault.Code) {
    // SOAP 1.2 format
    code = fault.Code.Value;
    if (fault.Code.Subcode?.Value) {
      code += `: ${fault.Code.Subcode.Value}`;
    }
  }

  if (fault.Reason) {
    if (typeof fault.Reason.Text === "string") {
      message = fault.Reason.Text;
    } else if (fault.Reason.Text?.$value) {
      message = fault.Reason.Text.$value;
    }
  }

  // Create the original error for reference
  const originalErrorMessage = `${code}: ${message}${detail ? `: ${JSON.stringify(detail)}` : ""}`;
  const originalError = new Error(originalErrorMessage);

  // Parse specific error types
  if (message.includes("Card was not found")) {
    // Extract card ID from the message
    const cardIdMatch = message.match(/Card Id: (\w+)/);
    const cardId = cardIdMatch?.[1] || "unknown";
    throw new CardNotFound(cardId, originalError);
  }

  // Default to internal error for unrecognized errors
  throw new PharosInternalError(message || "An unknown internal server error occurred", originalError);
}

/**
 * Wraps a SOAP client method call with proper error handling
 */
export async function wrapSoapCall<T>(soapCall: () => Promise<T>): Promise<T> {
  try {
    return await soapCall();
  } catch (error) {
    // Check if this is already one of our custom errors
    if (error instanceof PharosError) {
      throw error;
    }

    // Check if this looks like a SOAP fault
    if (error instanceof Error) {
      const errorMessage = error.message;

      // Handle other common patterns
      if (errorMessage.includes("Card was not found")) {
        const cardIdMatch = errorMessage.match(/Card Id: (\w+)/);
        const cardId = cardIdMatch?.[1] || "unknown";
        throw new CardNotFound(cardId, error);
      }
    }

    // Re-throw if we can't handle it
    throw error;
  }
}
