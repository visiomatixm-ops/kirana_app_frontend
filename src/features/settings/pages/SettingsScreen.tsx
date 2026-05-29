import AccountSettings from "./AccountSettings";

interface SettingsScreenProps {
  activeScreen?: string;
  onNavigate?: (screen: string) => void;
}

export default function SettingsScreen({ activeScreen = "settings", onNavigate = () => {} }: SettingsScreenProps) {
  return <AccountSettings activeScreen={activeScreen} onNavigate={onNavigate} />;
}
