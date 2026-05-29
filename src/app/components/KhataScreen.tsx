import CustomerKhata from "./CustomerKhata";

interface KhataScreenProps {
  activeScreen?: string;
  onNavigate?: (screen: string) => void;
}

export default function KhataScreen({ activeScreen = "khata", onNavigate = () => {} }: KhataScreenProps) {
  return <CustomerKhata activeScreen={activeScreen} onNavigate={onNavigate} />;
}
