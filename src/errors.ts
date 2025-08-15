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
 * Thrown when a user name already exists in the system
 */
export class DuplicateUserName extends PharosError {
  readonly code = "DUPLICATE_USER_NAME";

  constructor(
    public readonly userName: string,
    originalError?: Error,
  ) {
    super(`There is already a user called '${userName}'.`, originalError);
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

      if (errorMessage.includes("There is already a user called")) {
        const userNameMatch = errorMessage.match(/user called '([^']+)'/);
        const userName = userNameMatch?.[1] || "unknown";
        throw new DuplicateUserName(userName, error);
      }
    }

    // Re-throw if we can't handle it
    throw error;
  }
}
