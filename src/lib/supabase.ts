
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/use-toast";

export type SignInCredentials = {
  email: string;
  password: string;
};

export type SignUpCredentials = {
  email: string;
  password: string;
  first_name: string;
  last_name: string;
  phone_number: string;
};

export const signIn = async ({ email, password }: SignInCredentials) => {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw error;
    return { data, error: null };
  } catch (error: any) {
    toast({
      title: "Error signing in",
      description: error.message || "Please check your credentials and try again.",
      variant: "destructive",
    });
    return { data: null, error };
  }
};

export const signUp = async ({ email, password, first_name, last_name, phone_number }: SignUpCredentials) => {
  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          first_name,
          last_name,
          phone_number,
        },
      },
    });

    if (error) throw error;

    // If sign up is successful, create a new user profile
    // Instead of using production schema, we store user data in public schema
    // We'll use mock data until the proper tables are set up in Supabase
    if (data.user) {
      // This block is commented out for now as the 'users' table doesn't exist in the Supabase schema yet
      /* 
      const { error: userError } = await supabase
        .from('users')
        .insert([
          {
            id: data.user.id,
            email,
            first_name,
            last_name,
            phone_number,
            role_id: 7, // default role
          },
        ]);

      if (userError) throw userError;
      */
    }

    toast({
      title: "Account created successfully!",
      description: "Please check your email to verify your account.",
    });

    return { data, error: null };
  } catch (error: any) {
    toast({
      title: "Error signing up",
      description: error.message || "Please try again.",
      variant: "destructive",
    });
    return { data: null, error };
  }
};

export const signOut = async () => {
  try {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  } catch (error: any) {
    toast({
      title: "Error signing out",
      description: error.message || "Please try again.",
      variant: "destructive",
    });
  }
};
