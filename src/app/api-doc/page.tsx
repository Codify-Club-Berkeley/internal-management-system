import { getApiDocs } from "../../../lib/swagger";
import ReactSwagger from "./react-swagger";

export default async function IndexPage() {
  const spec = await getApiDocs();
  return (
    <section className="container">
      {/* Create a white background wrapper in tailwind */}
      <div className="bg-white rounded-lg shadow-lg p-4">
        <ReactSwagger spec={spec} />
      </div>
    </section>
  );
}
