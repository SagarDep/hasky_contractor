export interface NewProjectRoot {
  new_project: Newproject;
}

export interface Newproject {
  button: Button;
  page1: Page1;
  page2: Page2;
  page3: Page3;
  page4: Page4;
  end_page: Endpage;
}

interface Endpage {
  name: string;
  number: string;
  addres: string;
  supervisor_name: string;
  description: string;
  total: string;
  paid: string;
  overtime: string;
  project_type: string;
  project_phase: string;
  Project_length: string;
}

interface Page4 {
  project_end: string;
  type_project: string;
  buttons: Buttons;
}

interface Buttons {
  less: string;
  moths: string;
  more: string;
  civil: string;
  commercial: string;
  industrial: string;
  residential: string;
  other: string;
}

interface Page3 {
  paid: string;
  overtime: string;
  project: string;
  button: Button3;
}

interface Button3 {
  none: string;
  hours: string;
  starting: string;
  starting_phase: string;
  middle: string;
  endindg: string;
}

interface Page2 {
  supervisor: string;
  supervisor_number: string;
  daily: string;
  button: Button2;
}

interface Button2 {
  minutes: string;
}

interface Page1 {
  name: string;
  number: string;
  addres: string;
  description: string;
}

interface Button {
  cancel: string;
  back: string;
  next: string;
  save: string;
}