import LocaleDropdown from "@/components/custom/locale-dropdown";
import { Button } from "@/components/ui/button";

export default function TopBar() {
  return (
    <div className="p-6 bg-muted/40 flex flex-row">
      <LocaleDropdown />
      <Button>Yo</Button>
    </div>
  );
}
