import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function SearchCity() {
  return (
    <div className="flex w-full max-w-sm items-center gap-2">
      <Input type="text" placeholder="Enter your city name" />
      <Button type="submit" variant="outline">
        Search
      </Button>
    </div>
  );
}
