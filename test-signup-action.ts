import { signup } from './app/actions/auth.ts';

async function main() {
  const fd = new FormData();
  fd.append("name", "Test Action User");
  fd.append("email", "testaction" + Date.now() + "@example.com");
  fd.append("password", "password123");
  
  try {
    const res = await signup(fd);
    console.log("Signup Result:", res);
  } catch(e) {
    console.error("Signup Threw:", e);
  }
}

main();
