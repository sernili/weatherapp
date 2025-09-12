import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Calendar } from "@/components/ui/calendar";
import { zodResolver } from "@hookform/resolvers/zod";
import { Check, ChevronsUpDown, ChevronDownIcon } from "lucide-react";
import { Label } from "@/components/ui/label";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { cn } from "@/lib/utils";

import {
  WateringRequirements,
  WateringRequirementsOptions,
} from "@/types/watering";
import { useEffect, useState } from "react";

const wateringRequirements: WateringRequirementsOptions[] = [
  { label: "Low", value: 1 },
  { label: "Moderate", value: 2 },
  { label: "High", value: 3 },
] as const;

const FormSchema = z.object({
  wateringRequirements: z.union([z.literal(1), z.literal(2), z.literal(3)]),
  city: z.string().min(1, "City is required"),
  lastWater: z.date(),
});
type FormValues = z.infer<typeof FormSchema>;

export function SearchArea({
  city,
  setCity,
  waterRequirements,
  setWaterRequirements,
  lastWater,
  setLastWater,
}: {
  city: string | undefined;
  setCity: (city: string) => void;
  waterRequirements: WateringRequirements;
  setWaterRequirements: (waterRequirements: WateringRequirements) => void;
  lastWater: Date;
  setLastWater: (lastWater: Date) => void;
}) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const [open, setOpen] = useState(false);
  const [date, setDate] = useState<Date | undefined>(undefined);

  const form = useForm<FormValues>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      wateringRequirements: 2,
      city: city ?? "",
      lastWater: lastWater,
    },
  });

  function onSubmit(data: FormValues) {
    setCity(data.city);
    setWaterRequirements(data.wateringRequirements);
    console.log("water: ", data.wateringRequirements);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex items-end justify-center gap-6"
      >
        {/* City */}
        <FormField
          control={form.control}
          name="city"
          render={({ field }) => (
            <FormItem className="flex flex-col space-y-4">
              <FormLabel className="block font-bold text-dark">
                Your Location:
              </FormLabel>
              <FormControl>
                <Input
                  type="text"
                  placeholder="Enter your city name"
                  autoComplete="address-level2"
                  className="border-dark border-2 hover:border-2 hover:cursor-pointer"
                  {...field} // ✅ connects to RHF
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Watering Requirements */}
        <FormField
          control={form.control}
          name="wateringRequirements"
          render={({ field }) => (
            <FormItem className="flex flex-col space-y-4">
              <FormLabel className="block font-bold text-dark">
                Watering Requirements:
              </FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant="outline"
                      role="combobox"
                      className={cn(
                        "w-[200px] justify-between font-normal bg-white border-dark border-2",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value
                        ? wateringRequirements.find(
                            (req) => req.value === field.value
                          )?.label
                        : "Select"}
                      <ChevronsUpDown className="opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-[200px] p-0">
                  <Command>
                    <CommandList>
                      <CommandEmpty>
                        No watering requirements found.
                      </CommandEmpty>
                      <CommandGroup className="bg-white">
                        {wateringRequirements.map((req) => (
                          <CommandItem
                            value={req.label}
                            key={req.value}
                            onSelect={() =>
                              form.setValue("wateringRequirements", req.value)
                            }
                          >
                            {req.label}
                            <Check
                              className={cn(
                                "ml-auto bg-white",
                                req.value === field.value
                                  ? "opacity-100"
                                  : "opacity-0"
                              )}
                            />
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Last Water */}
        <FormField
          control={form.control}
          name="lastWater"
          render={({ field }) => {
            return (
              <FormItem className="flex flex-col gap-4">
                <FormLabel className="block font-bold text-dark">
                  Last Watering:
                </FormLabel>
                <Popover open={open} onOpenChange={setOpen}>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        id="date"
                        className="w-48 justify-between font-normal border-dark border-2"
                      >
                        {field.value
                          ? mounted
                            ? field.value.toLocaleDateString() // Client locale
                            : field.value.toLocaleDateString("en-US") // SSR fallback
                          : "Select date"}
                        <ChevronDownIcon />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent
                    className="w-fit overflow-hidden p-0 bg-white"
                    align="start"
                  >
                    <Calendar
                      mode="single"
                      selected={field.value}
                      captionLayout="dropdown"
                      required
                      disabled={(date) => date > new Date()}
                      onSelect={(date) => {
                        if (!date) return;
                        field.onChange(date);
                        setLastWater(new Date(date));
                        setOpen(false);
                      }}
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            );
          }}
        />

        {/* Submit */}
        <Button
          type="submit"
          variant="outline"
          className="border-dark border-2 hover:cursor-pointer bg-secondary hover:bg-tertiary"
        >
          Search
        </Button>
      </form>
    </Form>
  );
}
