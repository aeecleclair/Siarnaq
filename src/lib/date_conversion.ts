import { format } from "date-fns";
import { fr } from "date-fns/locale";

export function apiFormatDate(date: Date | undefined) {
  return date ? format(date, "yyyy-MM-dd", { locale: fr }) : undefined;
}
