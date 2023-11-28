export default function logError(message = 'Error', error: unknown) {
  if (error instanceof Error) {
    Error;
    console.error(`${message}: ${error.message}`);
    console.error(`Stack: ${error.stack}`);
  } else {
    console.error(`Unknown error: `, error);
  }
}
