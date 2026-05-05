import { SignJWT } from 'jose';

async function test() {
  try {
    const key = new TextEncoder().encode('undefined');
    const token = await new SignJWT({}).setProtectedHeader({ alg: 'HS256' }).sign(key);
    console.log("Token:", token);
  } catch (e) {
    console.error("Jose error:", e);
  }
}

test();
