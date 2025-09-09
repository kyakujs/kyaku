import { Combobox as ComboboxPrimitive } from "@base-ui-components/react";

const Combobox = ComboboxPrimitive.Root;

const ComboboxValue: React.FC<
  React.ComponentProps<typeof ComboboxPrimitive.Value>
> = ({ children, ...props }) => {
  return (
    <ComboboxPrimitive.Value {...props}>{children}</ComboboxPrimitive.Value>
  );
};
ComboboxValue.displayName = "ComboboxValue";

const ComboboxTrigger: React.FC<
  React.ComponentProps<typeof ComboboxPrimitive.Trigger>
> = ({ children, ...props }) => {
  return (
    <ComboboxPrimitive.Trigger {...props}>{children}</ComboboxPrimitive.Trigger>
  );
};
ComboboxTrigger.displayName = "ComboboxTrigger";

const ComboboxPortal: React.FC<
  React.ComponentProps<typeof ComboboxPrimitive.Portal>
> = ({ children, ...props }) => {
  return (
    <ComboboxPrimitive.Portal {...props}>{children}</ComboboxPrimitive.Portal>
  );
};
ComboboxPortal.displayName = "ComboboxPortal";

const ComboboxPositioner: React.FC<
  React.ComponentProps<typeof ComboboxPrimitive.Positioner>
> = ({ children, ...props }) => {
  return (
    <ComboboxPrimitive.Positioner {...props}>
      {children}
    </ComboboxPrimitive.Positioner>
  );
};
ComboboxPositioner.displayName = "ComboboxPositioner";

const ComboboxPopup: React.FC<
  React.ComponentProps<typeof ComboboxPrimitive.Popup>
> = ({ children, ...props }) => {
  return (
    <ComboboxPrimitive.Popup {...props}>{children}</ComboboxPrimitive.Popup>
  );
};
ComboboxPopup.displayName = "ComboboxPopup";

const ComboboxInput: React.FC<
  React.ComponentProps<typeof ComboboxPrimitive.Input>
> = ({ children, ...props }) => {
  return (
    <ComboboxPrimitive.Input {...props}>{children}</ComboboxPrimitive.Input>
  );
};
ComboboxInput.displayName = "ComboboxInput";

const ComboboxSeparator: React.FC<
  React.ComponentProps<typeof ComboboxPrimitive.Separator>
> = ({ children, ...props }) => {
  return (
    <ComboboxPrimitive.Separator {...props}>
      {children}
    </ComboboxPrimitive.Separator>
  );
};
ComboboxSeparator.displayName = "ComboboxSeparator";

const ComboboxEmpty: React.FC<
  React.ComponentProps<typeof ComboboxPrimitive.Empty>
> = ({ children, ...props }) => {
  return (
    <ComboboxPrimitive.Empty {...props}>{children}</ComboboxPrimitive.Empty>
  );
};
ComboboxEmpty.displayName = "ComboboxEmpty";

const ComboboxList: React.FC<
  React.ComponentProps<typeof ComboboxPrimitive.List>
> = ({ children, ...props }) => {
  return <ComboboxPrimitive.List {...props}>{children}</ComboboxPrimitive.List>;
};
ComboboxList.displayName = "ComboboxList";

const ComboboxItem: React.FC<
  React.ComponentProps<typeof ComboboxPrimitive.Item>
> = ({ children, ...props }) => {
  return <ComboboxPrimitive.Item {...props}>{children}</ComboboxPrimitive.Item>;
};
ComboboxItem.displayName = "ComboboxItem";

const ComboboxItemIndicator: React.FC<
  React.ComponentProps<typeof ComboboxPrimitive.ItemIndicator>
> = ({ children, ...props }) => {
  return (
    <ComboboxPrimitive.ItemIndicator {...props}>
      {children}
    </ComboboxPrimitive.ItemIndicator>
  );
};
ComboboxItemIndicator.displayName = "ComboboxItemIndicator";

export {
  Combobox,
  ComboboxTrigger,
  ComboboxValue,
  ComboboxEmpty,
  ComboboxList,
  ComboboxItem,
  ComboboxItemIndicator,
  ComboboxPortal,
  ComboboxPositioner,
  ComboboxPopup,
  ComboboxInput,
  ComboboxSeparator,
};
