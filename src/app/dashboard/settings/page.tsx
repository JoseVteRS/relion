import { TitlePage } from "@/components/common/page-title";
import { SettingsCard } from "./settings-card";

export default function SettingsPage() {
  return (
    <div className="">
      <header className="flex items-center justify-between mb-10">
        <TitlePage>Ajustes</TitlePage>
      </header>
      <SettingsCard />
    </div>
  );
}
