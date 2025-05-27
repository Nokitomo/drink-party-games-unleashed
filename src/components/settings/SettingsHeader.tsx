
interface SettingsHeaderProps {
  title: string;
  description: string;
}

export const SettingsHeader = ({ title, description }: SettingsHeaderProps) => {
  return (
    <div className="text-center mb-6">
      <h2 className="text-2xl font-bold text-white mb-2">{title}</h2>
      <p className="text-white/70">{description}</p>
    </div>
  );
};
