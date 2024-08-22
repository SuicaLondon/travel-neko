import {
  ACCEPTED_IMAGE_TYPES,
  MAX_FILE_SIZE,
} from "@/app/constants/file-constants";
import { MapTypes } from "@/app/models/plan-model";
import { Form } from "@/components/form";
import { Modal } from "@/components/modal";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useWatch } from "react-hook-form";
import { z } from "zod";

type AddTravelPlanModalProps = {
  isOpened: boolean;
  onModalClose: () => void;
};

const AddTravelPlanSchema = z.object({
  title: z.string().min(2),
  mapType: z.nativeEnum(MapTypes),
  coverImage: z
    .unknown()
    .transform((value) => {
      return value as FileList;
    })
    .optional()
    .refine((files) => files?.length === 0 || files!.length > 0, {
      message: "File is required if you upload one.",
    })
    .transform((files) => (files && files.length > 0 ? files[0] : null))
    .refine((file) => !file || file.size <= MAX_FILE_SIZE, {
      message: "Max image size is 5MB.",
    })
    .refine((file) => !file || ACCEPTED_IMAGE_TYPES.includes(file.type), {
      message: "Only .jpg, .jpeg, .png, and .webp formats are supported.",
    }),
});

type AddTravelPlanType = z.infer<typeof AddTravelPlanSchema>;

export function AddTravelPlanModal({
  isOpened,
  onModalClose,
}: AddTravelPlanModalProps) {
  const methods = useForm<AddTravelPlanType>({
    resolver: zodResolver(AddTravelPlanSchema),
    defaultValues: {
      title: "",
      mapType: MapTypes.google,
    },
  });
  const {
    handleSubmit,
    formState: { errors },
  } = methods;

  const onSubmit = (data: any) => {
    console.log(data);
  };

  return (
    <Modal isOpened={isOpened} onClose={onModalClose}>
      <Modal.Header title="Hello" onClose={onModalClose} />

      <Form methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Modal.Body>
          <Form.FormField
            placeholder={"Please input the title of your trip"}
            label="Trip Title"
            name={"title"}
            error={errors["title"]}
          />
          <Form.FormRadioGroup
            name="mapType"
            configs={[
              { label: "Google Map", value: MapTypes.google },
              { label: "Apple Map", value: MapTypes.apple },
            ]}
            error={errors["mapType"]}
          />

          <Form.FormImageField
            name={"coverImage"}
            error={errors["coverImage"]}
          />
        </Modal.Body>
        <Modal.Footer onSubmit={onModalClose} onClose={onModalClose} />
      </Form>
    </Modal>
  );
}
