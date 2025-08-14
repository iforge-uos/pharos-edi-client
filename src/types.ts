import { GetUserDetails2SoapOut } from "./generated/service";

/**
 * Represents a user in the Pharos EDI system.
 * Contains user identification, billing, contact information, and system-specific settings.
 */
export interface User {
  /** Pharos-specific unique user index identifier */
  user_id: number;
  /** User active status (1 = active, 0 = inactive) */
  active: number;
  /** Uni username */
  id: string;
  /** Billing payment method option (e.g., "Advance") */
  billing_option: string;
  /** User's last name/surname */
  last_name: string | undefined;
  /** User's first name(s) */
  first_names: string;
  /** Group identifier the user belongs to */
  group_id: number;
  /** User's password (may be undefined for security) */
  password: string | undefined;
  /** User's physical address */
  address: string | undefined;
  /** User's phone number */
  phone: string | undefined;
  /** Additional comments or notes about the user */
  comment: string | undefined;
  /** Rate identifier for billing calculations */
  rate_id: number;
  /** University card number with xxx prefix (differs from database values) */
  card_id: number;
  /** Offline usage limit for the user */
  offline_limit: number;
  /** User's alias, typically same as username */
  user_alias: string;
  /** User's middle initial */
  middle_initial: string | undefined;
  /** Date when the user account was created */
  created: Date;
  /** Express user flag (1 = express user, 0 = regular user) */
  is_express: number;
  /** Visitor user flag (1 = visitor, 0 = regular user) */
  is_visitor: number;
  /** Guest user flag (1 = guest, 0 = regular user) */
  is_guest: number;
  /** User's email address */
  email: string;
  /** Custom field 1 for additional user data */
  custom1: string | undefined;
  /** Custom field 2 for additional user data */
  custom2: string | undefined;
  /** Role identifier determining user permissions */
  role_id: number;
  /** unknown */
  timestamp: string;
}

export type UnwrapValue<T> = {
  [K in keyof T]: T[K] extends { $value?: infer U } | undefined
    ? U
    : never
}

/**
 * Represents a cost center entity with name which I think is an exclusive constraint.
 *
 * @interface CostCenter
 *
 * @example
 * ```typescript
 * const costCenters: CostCenter[] = [
 *   {
 *     name: "CCA teams MEE",
 *     description: "CCA teams MEE 24-25",
 *   },
 *   {
 *     name: "GEE201",
 *     description: "GEE201 24-25",
 *   },
 *   {
 *     name: "GEE301",
 *     description: "GEE301 24-25",
 *   },
 *   {
 *     name: "iForge Rep",
 *     description: "iForge Rep Events/Training 2024-25",
 *   }
 * ];
 * ```
 */
export interface CostCenter {
  name: string;
  description: string
}