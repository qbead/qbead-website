/**
 * Transport abstraction. The bead store only talks to a `BeadLink`, so another transport
 * (USB serial, a simulator for demos) is one new file implementing `Connect`.
 */

/** A live connection to a bead. */
export interface BeadLink {
  /** Send one line (the newline is added by the transport). */
  write(line: string): Promise<void>
  /** Close the connection. Never throws. */
  close(): Promise<void>
}

/** Callbacks the store hands to a transport. */
export type LinkHandlers = {
  /** Raw incoming text. Chunks may cut lines anywhere. */
  onText(chunk: string): void
  /** The connection dropped (not called for a `close()` the caller made). */
  onClose(): void
}

/**
 * Open a connection. Rejects with an error named `NotFoundError` if the user cancels
 * the device picker; the store treats that as a silent cancel.
 */
export type Connect = (handlers: LinkHandlers) => Promise<BeadLink>
