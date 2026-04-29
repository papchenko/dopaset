import LegalLayout from "./LegalLayout";
import { legalConfig } from "./legal.config";

export default function Terms() {
  return (
    <LegalLayout title="Terms of Use">

      <p className="text-gray-400">
        By using {legalConfig.appName}, you agree to use the platform responsibly.
      </p>

      <h2 className="text-xl font-semibold mt-6">Usage Rules</h2>
      <p className="text-gray-400">
        You may not misuse, exploit, or attempt to disrupt the service.
      </p>

      <h2 className="text-xl font-semibold mt-6">Disclaimer</h2>
      <p className="text-gray-400">
        The service is provided "as is" without warranties.
      </p>

    </LegalLayout>
  );
}