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
  city: string;
  setCity: (city: string) => void;
}) {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.target;
    const formData = new FormData(form);

    const formJson = Object.fromEntries(formData.entries());
    setCity(formJson.city);
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
      <div className="flex  gap-6">
        <Input
          type="text"
          placeholder="Enter your city name"
          name="city"
          defaultValue={city}
          autoComplete="home city"
        />
        <Button type="submit" variant="outline">
          Search
        </Button>
      </div>
    </form>
    //   </CardContent>
    // </Card>
  );
}
