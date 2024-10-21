-- Add avatar_url column to the profiles table
ALTER TABLE public.profiles
ADD COLUMN IF NOT EXISTS avatar_url TEXT;

-- Update the handle_new_user function to include the new column
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, first_name, last_name, avatar_url, business_name, phone_number)
  VALUES (NEW.id, '', '', '', '', '');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- If you haven't already, ensure the trigger is set up
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Grant necessary permissions (adjust as needed based on your security requirements)
GRANT ALL ON public.profiles TO authenticated;
GRANT ALL ON public.profiles TO service_role;

-- Update existing rows to have an empty string for avatar_url if it's currently NULL
UPDATE public.profiles
SET avatar_url = ''
WHERE avatar_url IS NULL;