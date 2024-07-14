import type { ExtendedComponent } from '@/types/components';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Adapt, Select, Sheet } from 'tamagui';

export type SelectOption = {
  label: string;
  value: string;
};

export function DefaultSelect({
  label,
  items,
  children,
  ...props
}: {
  label: string;
  items: Readonly<SelectOption[]>;
} & ExtendedComponent<typeof Select>) {
  // pick Select.Trigger from children
  const selectTrigger = React.Children.toArray(children).find(
    (child) => React.isValidElement(child) && child.type === Select.Trigger
  );
  return (
    <Select disablePreventBodyScroll id="select-demo-2" native {...props}>
      {selectTrigger}
      <Adapt when="sm" platform="touch">
        <Sheet
          native={!!props.native}
          modal
          dismissOnSnapToBottom
          animationConfig={{
            type: 'spring',
            damping: 25,
            mass: 0.6,
            stiffness: 350,
          }}
        >
          <Sheet.Frame>
            <Sheet.ScrollView>
              <Adapt.Contents />
            </Sheet.ScrollView>
          </Sheet.Frame>

          <Sheet.Overlay
            animation="lazy"
            enterStyle={{ opacity: 0 }}
            exitStyle={{ opacity: 0 }}
          />
        </Sheet>
      </Adapt>
      <Select.Content zIndex={200000}>
        <Select.Viewport minWidth={200}>
          <Select.Group>
            <Select.Label>{label}</Select.Label>
            {items.map((item, i) => (
              <Select.Item index={i} key={item.value} value={item.value}>
                <Select.ItemText>{item.label}</Select.ItemText>

                <Select.ItemIndicator marginLeft="auto">
                  <Ionicons name="checkmark-outline" />
                </Select.ItemIndicator>
              </Select.Item>
            ))}
          </Select.Group>
        </Select.Viewport>
      </Select.Content>
    </Select>
  );
}
