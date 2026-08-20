export interface SectionConfig {
  id: string;
  visible: boolean;
}

export interface Sections {
  sectionConfigs: Record<string, boolean>;
}
