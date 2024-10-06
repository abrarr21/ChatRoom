declare module "bcryptjs" {
  const bcrypt: {
    hash: (
      data: string,
      saltOrRounds: any,
      callback?: (err: Error | null, hash: string) => void,
    ) => Promise<string>;
    compare: (data: string, encrypted: string) => Promise<boolean>;
    // Add more specific method signatures as needed
  };
  export = bcrypt;
}

declare module "cookie-parser" {
  import { RequestHandler } from "express";
  function cookieParser(secret?: string | string[]): RequestHandler;
  export = cookieParser;
}

declare module "jsonwebtoken" {
  export function sign(
    payload: string | object | Buffer,
    secret: string | Buffer,
    options?: object,
  ): string;
  export function verify(
    token: string,
    secretOrPublicKey: string | Buffer,
    options?: object,
  ): string | object;
}
