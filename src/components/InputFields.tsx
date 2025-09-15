import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function InputFields({
  city,
  setCity,
}: {
  city: string | undefined;
  setCity: (city: string) => void;
}) {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;
    const formData = new FormData(form);

    const formJson = Object.fromEntries(formData.entries());
    setCity(formJson.city.toString());
    console.log(formJson.city.toString());
  };

  return (
    <form method="post" onSubmit={handleSubmit}>
      <div className="space-y-4">
        <Label htmlFor="city" className="block font-bold text-dark ">
          Your Location:
        </Label>

        <div className="flex items-center justify-center gap-6">
          <Input
            type="text"
            className="border-dark border-2 hover:cursor-pointer  "
            placeholder="Enter your city name"
            name="city"
            defaultValue={city}
            autoComplete="home city"
          />

          <Button
            type="submit"
            variant="outline"
            className="border-dark border-2 hover:cursor-pointer  bg-secondary hover:bg-tertiary"
          >
            Search
          </Button>
        </div>
      </div>
    </form>
  );
}
