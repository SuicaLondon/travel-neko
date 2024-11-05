import { Form } from "@/components/form";
import { Modal } from "@/components/modal";
import {
  ACCEPTED_IMAGE_TYPES,
  MAX_FILE_SIZE,
} from "@/constants/file-constants";
import { FETCH_PLAN_LIST_QUERY_KEY } from "@/constants/query-constants";
import { useFormErrorToast } from "@/hooks/use-form-error-toast";
import { useUnmount } from "@/hooks/use-unmount";
import { useUpdatePlanQuery } from "@/hooks/use-update-plan-query";
import { MapTypes, UpdateTravelPlanModel } from "@/models/plan-model";
import { getBase64 } from "@/utils/file-utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

type UpdateTravelPlanModalProps = {
  planId: string;
  plan: UpdateTravelPlanModel;
  isOpened: boolean;
  onModalClose: () => void;
};

const UpdateTravelPlanSchema = z.object({
  title: z.string().min(2),
  mapType: z.nativeEnum(MapTypes),
  coverImage: z
    .unknown()
    .transform((value) => value as FileList)
    .refine((files) => files !== undefined && files.length > 0, {
      message: "File is required",
    })
    .transform((files) => (files && files.length > 0 ? files[0] : undefined))
    .refine((file) => !file || file.size <= MAX_FILE_SIZE, {
      message: "Max image size is 5MB.",
    })
    .refine((file) => !file || ACCEPTED_IMAGE_TYPES.includes(file.type), {
      message: "Only .jpg, .jpeg, .png, and .webp formats are supported.",
    }),
});

type UpdateTravelPlanType = z.infer<typeof UpdateTravelPlanSchema>;

export function UpdateTravelPlanModal({
  planId,
  plan,
  isOpened,
  onModalClose,
}: UpdateTravelPlanModalProps) {
  const methods = useForm<UpdateTravelPlanType>({
    resolver: zodResolver(UpdateTravelPlanSchema),
    defaultValues: {
      title: plan.title,
      mapType: plan.mapType,
      coverImage: plan.coverImage
        ? new File([plan.coverImage], "coverImage", { type: "image/jpeg" })
        : undefined,
    },
  });
  const {
    handleSubmit,
    reset,
    formState: { errors },
  } = methods;
  const queryClient = useQueryClient();

  const { mutate: updatePlan, isPending: isUpdatingPlan } = useUpdatePlanQuery(
    planId,
    {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: FETCH_PLAN_LIST_QUERY_KEY });
        reset();
        onModalClose();
      },
    },
  );
  useFormErrorToast(errors);
  useUnmount(reset);

  const onClose = () => {
    reset();
    onModalClose();
  };

  const onSubmit: SubmitHandler<UpdateTravelPlanType> = async (data) => {
    if (!data.coverImage) return;
    const coverImage = await getBase64(data.coverImage);
    await updatePlan({
      title: data.title,
      coverImage: coverImage,
      mapType: data.mapType,
    });
  };

  return (
    <Modal isOpened={isOpened} onClose={onClose}>
      <Modal.Header title="Hello" onClose={onClose} />

      <Form methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Modal.Body>
          <Form.FormField
            placeholder={"Please input the title of your trip"}
            label="Trip Title"
            name={"title"}
            error={errors["title"]}
            disabled={isUpdatingPlan}
          />
          <Form.FormRadioGroup
            name="mapType"
            configs={[
              { label: "Google Map", value: MapTypes.google },
              { label: "Apple Map", value: MapTypes.apple },
            ]}
            error={errors["mapType"]}
            disabled={isUpdatingPlan}
          />

          <Form.FormImageField
            name={"coverImage"}
            error={errors["coverImage"]}
            disabled={isUpdatingPlan}
          />
        </Modal.Body>
        <Modal.Footer
          disabled={isUpdatingPlan}
          onSubmit={onClose}
          onClose={onClose}
        />
      </Form>
    </Modal>
  );
}
