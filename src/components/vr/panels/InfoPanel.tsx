'use client';

import { useMemo } from 'react';
import { Container, Text, withOpacity } from '@react-three/uikit';
import { getPartInfoForComponent, PartInfo } from '@/lib/constants/partInfo';
import { getTriviaForComponent } from '@/lib/constants/trivia';
import { VRColors, sanitizeVRText } from './theme';

interface InfoPanelProps {
  colors: VRColors;
  modelUrl: string | null;
  hoveredPartName?: string | null;
}

export function InfoPanel({ colors, modelUrl, hoveredPartName }: InfoPanelProps) {
  const parts: PartInfo[] = useMemo(
    () => (modelUrl ? getPartInfoForComponent(modelUrl) : []),
    [modelUrl]
  );
  const trivia = useMemo(
    () => (modelUrl ? getTriviaForComponent(modelUrl) : []),
    [modelUrl]
  );

  const groupedParts = useMemo(() => {
    return parts.reduce((groups, part) => {
      const category = part.category || 'General';
      (groups[category] ??= []).push(part);
      return groups;
    }, {} as Record<string, PartInfo[]>);
  }, [parts]);

  const isHighlighted = (part: PartInfo) => {
    if (!hoveredPartName) return false;
    const hovered = hoveredPartName.toLowerCase();
    const name = part.partName.toLowerCase();
    return name.includes(hovered) || hovered.includes(name);
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
      {/* Part information (top half) */}
      <Text fontSize={16} fontWeight={700} color={colors.accent}>
        Part Information
      </Text>
      <Container
        flexGrow={1}
        flexBasis={0}
        flexDirection="column"
        overflow="scroll"
        scrollbarWidth={4}
        scrollbarColor={colors.accent}
        gap={8}
        paddingRight={6}
      >
        {parts.length === 0 ? (
          <Text fontSize={12} color={colors.textMuted}>
            Select a component to explore its parts.
          </Text>
        ) : (
          Object.entries(groupedParts).map(([category, categoryParts]) => (
            <Container key={category} flexDirection="column" gap={4} flexShrink={0}>
              <Text fontSize={11} fontWeight={700} color={colors.textMuted}>
                {category.toUpperCase()}
              </Text>
              {categoryParts.map((part, i) => {
                const highlighted = isHighlighted(part);
                return (
                  <Container
                    key={i}
                    flexDirection="column"
                    gap={2}
                    padding={6}
                    borderRadius={8}
                    flexShrink={0}
                    backgroundColor={highlighted ? colors.selectedBg : withOpacity(colors.rowHoverBg, 0.35)}
                  >
                    <Text
                      fontSize={12}
                      fontWeight={700}
                      color={highlighted ? colors.selectedText : colors.text}
                    >
                      {sanitizeVRText(part.partName)}
                    </Text>
                    <Text fontSize={11} color={highlighted ? colors.selectedText : colors.textMuted}>
                      {sanitizeVRText(part.description)}
                    </Text>
                  </Container>
                );
              })}
            </Container>
          ))
        )}
      </Container>

      <Container height={2} backgroundColor={withOpacity(colors.divider, 0.6)} flexShrink={0} />

      {/* Trivia (bottom half) */}
      <Text fontSize={16} fontWeight={700} color={colors.accent}>
        Did You Know?
      </Text>
      <Container
        flexGrow={1}
        flexBasis={0}
        flexDirection="column"
        overflow="scroll"
        scrollbarWidth={4}
        scrollbarColor={colors.accent}
        gap={6}
        paddingRight={6}
      >
        {trivia.length === 0 ? (
          <Text fontSize={12} color={colors.textMuted}>
            Fun facts appear here once you pick a component.
          </Text>
        ) : (
          trivia.map((item, i) => (
            <Container
              key={i}
              padding={6}
              borderRadius={8}
              flexShrink={0}
              backgroundColor={withOpacity(colors.rowHoverBg, 0.35)}
            >
              <Text fontSize={11.5} color={colors.text}>
                {sanitizeVRText(item.fact)}
              </Text>
            </Container>
          ))
        )}
      </Container>
    </Container>
  );
}
