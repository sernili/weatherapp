import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function SearchLocationInput({
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
    // <Card className="w-full max-w-sm bg-white h-fit">
    //   <CardHeader>
    //     <CardTitle>Search for Your City</CardTitle>
    //     <CardDescription>
    //       Enter your email below to login to your account
    //     </CardDescription>
    //   </CardHeader>
    //   <CardContent>
    <form method="post" onSubmit={handleSubmit}>
      <div className="space-y-4">
        {/* <Label
          htmlFor="city"
          className="block font-bold font-mono text-dark text-lg"
        >
          Enter your location:
        </Label> */}

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
    //   </CardContent>
    // </Card>
  );
}
