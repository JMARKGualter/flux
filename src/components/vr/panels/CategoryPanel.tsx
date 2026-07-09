'use client';

import { Fragment, useMemo, useState } from 'react';
import { Container, Text, withOpacity } from '@react-three/uikit';
import { modelRegistry, ModelData } from '@/lib/3d/ModelLibrary';
import { VRColors } from './theme';

interface CategoryPanelProps {
  colors: VRColors;
  selectedId: string;
  onModelSelect: (id: string) => void;
}

export function CategoryPanel({ colors, selectedId, onModelSelect }: CategoryPanelProps) {
  const modelsByCategory = useMemo(() => {
    const groups: Record<string, ModelData[]> = {};
    Object.values(modelRegistry).forEach((model) => {
      (groups[model.category] ??= []).push(model);
    });
    return groups;
  }, []);

  const [openCategories, setOpenCategories] = useState<Record<string, boolean>>(() => {
    const selectedCategory = modelRegistry[selectedId]?.category;
    return selectedCategory ? { [selectedCategory]: true } : {};
  });

  const toggleCategory = (category: string) => {
    setOpenCategories((prev) => ({ ...prev, [category]: !prev[category] }));
  };

  return (
    <Container
      sizeX={0.5}
      sizeY={0.8}
      pixelSize={0.0015}
      flexDirection="column"
      backgroundColor={withOpacity(colors.panelBg, colors.panelOpacity)}
      borderWidth={2}
      borderColor={colors.panelBorder}
      borderRadius={16}
      padding={14}
      gap={8}
    >
      <Text fontSize={18} fontWeight={700} color={colors.accent}>
        Components
      </Text>

      <Container
        flexGrow={1}
        flexDirection="column"
        overflow="scroll"
        scrollbarWidth={4}
        scrollbarColor={colors.accent}
        gap={4}
        paddingRight={6}
      >
        {Object.entries(modelsByCategory).map(([category, models]) => {
          const isOpen = !!openCategories[category];
          return (
            <Fragment key={category}>
              <Container
                onClick={() => toggleCategory(category)}
                cursor="pointer"
                flexDirection="row"
                justifyContent="space-between"
                alignItems="center"
                paddingX={10}
                paddingY={7}
                borderRadius={8}
                flexShrink={0}
                backgroundColor={withOpacity(colors.rowHoverBg, isOpen ? 0.9 : 0.4)}
                hover={{ backgroundColor: withOpacity(colors.rowHoverBg, 1) }}
              >
                <Text fontSize={13.5} fontWeight={700} color={colors.text}>
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </Text>
                <Text fontSize={13.5} color={colors.textMuted}>
                  {isOpen ? '-' : '+'}
                </Text>
              </Container>

              {isOpen &&
                models.map((model) => {
                  const isSelected = model.id === selectedId;
                  return (
                    <Container
                      key={model.id}
                      onClick={() => onModelSelect(model.id)}
                      cursor="pointer"
                      paddingX={10}
                      paddingY={6}
                      marginLeft={10}
                      borderRadius={8}
                      flexShrink={0}
                      backgroundColor={isSelected ? colors.selectedBg : withOpacity(colors.rowHoverBg, 0)}
                      hover={{ backgroundColor: isSelected ? colors.selectedBg : withOpacity(colors.rowHoverBg, 0.7) }}
                    >
                      <Text
                        fontSize={12.5}
                        color={isSelected ? colors.selectedText : colors.textMuted}
                        fontWeight={isSelected ? 700 : 400}
                      >
                        {model.name}
                      </Text>
                    </Container>
                  );
                })}
            </Fragment>
          );
        })}
      </Container>
    </Container>
  );
}
