export interface WithQueryProps {
  loading: boolean;
  error?: Error;
  retry?: () => void;
}