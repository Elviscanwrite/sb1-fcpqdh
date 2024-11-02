import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";

export const signOut = async () => {
  const supabase = createClientComponentClient();
  const router = useRouter();

  try {
    await supabase.auth.signOut();
    router.push("/signin");
  } catch (error) {
    console.error("Error signing out:", error);
    throw error;
  }
};

export const signIn = async (email: string, password: string) => {
  const supabase = createClientComponentClient();

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    throw error;
  }
};

export const signUp = async (email: string, password: string) => {
  const supabase = createClientComponentClient();

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${window.location.origin}/api/auth/callback`,
    },
  });

  if (error) {
    throw error;
  }
};