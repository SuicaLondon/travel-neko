export class Responses {
  static code200 = (message: any) =>
    typeof message === "string"
      ? this.messageResponseGenerator(message, 200)
      : this.objectResponseGenerator(message, 200);
  static code201 = (message: string) =>
    this.messageResponseGenerator(message, 201);
  static code202 = (message: string) =>
    this.messageResponseGenerator(message, 202);
  static code204 = (message: string) =>
    this.messageResponseGenerator(message, 204);
  static code400 = (message: string) =>
    this.messageResponseGenerator(message, 400);
  static code403 = (message: string) =>
    this.messageResponseGenerator(message, 400);
  static code404 = (message: string) =>
    this.messageResponseGenerator(message, 404);

  static objectResponseGenerator = (object: Object, code: number) =>
    new Response(JSON.stringify(object), {
      headers: {
        "Content-Type": "application/json",
      },
      status: code,
    });
  static messageResponseGenerator = (message: string, code: number) =>
    new Response(
      JSON.stringify({
        message: message,
      }),
      {
        headers: {
          "Content-Type": "application/json",
        },
        status: code,
      },
    );
}
