"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { configSchema, type ConfigFormValues } from "@/lib/form-schema";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { SubmitHandler, useFieldArray, useForm } from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { UserConfigSchema } from "@/lib/function-schema";

interface CreateConfigFormProps {
  createConfig: (data: ConfigFormValues) => Promise<null>;
  defaultValues?: Partial<UserConfigSchema>;
}

export const CreateBotConfigForm: React.FC<CreateConfigFormProps> = ({
  createConfig,
  defaultValues = {},
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [data, setData] = useState({});

  const mapUserConfigToDefaultValues = (
    config: CreateConfigFormProps["defaultValues"],
  ): Partial<ConfigFormValues> => {
    if (config) {
      const fallbackMode =
        config.fallbackMode === "enabled" || config.fallbackMode === "disabled"
          ? config.fallbackMode
          : undefined;

      const fallbackEmail = config.fallbackEmail || undefined;

      return {
        fallbackMode: fallbackMode,
        fallbackEmail: fallbackEmail,
        transferNumber: config.transferNumber,
      };
    }
    return {};
  };

  const form = useForm<ConfigFormValues>({
    resolver: zodResolver(configSchema),
    mode: "onChange",
    defaultValues: mapUserConfigToDefaultValues(defaultValues),
  });

  const processForm: SubmitHandler<ConfigFormValues> = (data) => {
    setData(data);
    // api call and reset
    // form.reset();
    createConfig(data);
  };

  console.log(JSON.stringify(form.watch(), null, 2));

  type FieldName = keyof ConfigFormValues;

  const steps = [
    {
      id: "Step 1",
      name: "Bot Configuration",
      fields: ["transferNumber", "fallbackMode", "fallbackEmail"],
    },
    { id: "Step 2", name: "Complete" },
  ];

  const fallbackList = [
    { id: "enabled", name: "Enabled" },
    { id: "disabled", name: "Disabled" },
  ];

  const next = async () => {
    const fields = steps[currentStep].fields;

    const output = await form.trigger(fields as FieldName[], {
      shouldFocus: true,
    });

    if (!output) return;

    if (currentStep < steps.length - 1) {
      if (currentStep === steps.length - 2) {
        await form.handleSubmit(processForm)();
      }
      setCurrentStep((step) => step + 1);
    }
  };

  return (
    <>
      <Separator />
      <div>
        {/* Form Progress Bar */}
        <ul className="flex gap-4">
          {steps.map((step, index) => (
            <li key={step.name} className="md:flex-1">
              {currentStep > index ? (
                <div className="group flex w-full flex-col border-l-4 border-sky-600 py-2 pl-4 transition-colors md:border-l-0 md:border-t-4 md:pb-0 md:pl-0 md:pt-4">
                  <span className="text-sm font-medium text-sky-600 transition-colors ">
                    {step.id}
                  </span>
                  <span className="text-sm font-medium">{step.name}</span>
                </div>
              ) : currentStep === index ? (
                <div
                  className="flex w-full flex-col border-l-4 border-sky-600 py-2 pl-4 md:border-l-0 md:border-t-4 md:pb-0 md:pl-0 md:pt-4"
                  aria-current="step"
                >
                  <span className="text-sm font-medium text-sky-600">
                    {step.id}
                  </span>
                  <span className="text-sm font-medium">{step.name}</span>
                </div>
              ) : (
                <div className="group flex h-full w-full flex-col border-l-4 border-gray-200 py-2 pl-4 transition-colors md:border-l-0 md:border-t-4 md:pb-0 md:pl-0 md:pt-4">
                  <span className="text-sm font-medium text-gray-500 transition-colors">
                    {step.id}
                  </span>
                  <span className="text-sm font-medium">{step.name}</span>
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
      <Separator />
      {/* Form */}
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(processForm)}
          className="space-y-8 w-full"
        >
          <div
            className={cn(
              currentStep === 1
                ? "md:inline-block w-full"
                : "md:grid md:grid-cols-3 gap-8",
            )}
          >
            {currentStep === 0 && (
              <>
                <FormField
                  control={form.control}
                  name="transferNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Transfer Number {"(Not Required)"}</FormLabel>
                      <FormControl>
                        <Input
                          disabled={false}
                          placeholder="Enter transfer number"
                          value={field.value || ""}
                          onChange={(e) => {
                            if (e.target.value === "") {
                              field.onChange(null);
                            } else {
                              field.onChange(e.target.value);
                            }
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="fallbackMode"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Fallback Mode (Enabled Recommended)</FormLabel>
                      <Select
                        disabled={false}
                        onValueChange={field.onChange}
                        value={field.value}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue
                              defaultValue={field.value}
                              placeholder="Select fallback mode"
                            />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {/* @ts-ignore  */}
                          {fallbackList.map((val) => (
                            <SelectItem key={val.id} value={val.id}>
                              {val.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {form.watch("fallbackMode") === "enabled" && (
                  <FormField
                    control={form.control}
                    name="fallbackEmail"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Fallback Email</FormLabel>
                        <FormControl>
                          <Input
                            disabled={false}
                            placeholder="Enter fallback email"
                            defaultValue={""}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}
              </>
            )}
            {currentStep === 1 && (
              <div>
                <h1 className="font-bold text-green-600">Completed</h1>
                <pre className="whitespace-pre-wrap">
                  {data &&
                  typeof data === "object" &&
                  Object.keys(data).length > 0 ? (
                    Object.entries(data).map(([key, value]) => (
                      <p key={key}>
                        <strong>{key}:</strong> {value}
                      </p>
                    ))
                  ) : (
                    <p>No data available.</p>
                  )}
                </pre>
              </div>
            )}
          </div>
        </form>
      </Form>

      {/* Navigation */}
      <div className="mt-8 pt-5">
        <div className="flex">
          <button
            type="button"
            onClick={next}
            disabled={currentStep === steps.length - 1}
            className="rounded bg-white px-2 py-1 text-sm font-semibold text-sky-900 shadow-sm ring-1 ring-inset ring-sky-300 hover:bg-sky-50 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="h-6 w-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8.25 4.5l7.5 7.5-7.5 7.5"
              />
            </svg>
          </button>
          <p className="m-2 text-sm text-foreground">Click here to Submit</p>
        </div>
      </div>
    </>
  );
};
