import CalculationsCard from "./_components/calculation-result";
import CarbonInputForm from "./_components/carbon-form-client";

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

export default function CarbonCreatePage() {
  return(
  <div className="flex flex-row">
    <CarbonInputForm />;
  </div>

  ) 
}
