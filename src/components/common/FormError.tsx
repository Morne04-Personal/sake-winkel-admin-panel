
interface FormErrorProps {
  message: string;
}

const FormError = ({ message }: FormErrorProps) => (
  <div className="text-red-500 text-sm mt-1">{message}</div>
);

export default FormError;
