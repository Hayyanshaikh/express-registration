export const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

// Dynamic form input handling
export const handleInputChange = (
  e: React.ChangeEvent<HTMLInputElement>,
  setForm: any
) => {
  const { name, value } = e.target;
  setForm((prevForm: any) => ({
    ...prevForm,
    [name]: value,
  }));
};
