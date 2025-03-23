# 🛡️ Supabase Auth Starter – React Native CLI

Yo! This is a lightweight starter setup for email-based auth using **Supabase** in a **React Native CLI** project.

You get:

- 📝 Email Signup
- 🔐 Email Login
- 📧 Email Verification
- 🚪 Logout
- 🔄 Session Management
- ✨ All custom UI (no Supabase UI stuff)

---

## 🧰 What We Used

- React Native CLI (No Expo, bro!)
- Supabase JS SDK
- TypeScript
- AsyncStorage (for sessions)
- React Navigation (for screen flow)
- Formik + Yup (for forms and validation)

---

## ⚙️ Setup — Do This First

```bash
# 1. Clone this bad boy
git clone https://github.com/niralspectrum/supabaseAuthReactNative.git
cd supabaseAuthReactNative

# 2. Install your packages
npm install


# 3. Add your Supabase creds
# → Create a .env file in the root folder and add:
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=your_anon_key_here

# 4. Link for native stuff (just in case)
npx pod-install
```
