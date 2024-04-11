import { Group, Code, ScrollArea, rem } from '@mantine/core';
import {
  IconNotes,
  IconCalendarStats,
  IconGauge,
  IconRun,
  IconMoodSmile
} from '@tabler/icons-react';
// import { UserButton } from '../UserButton/UserButton';
import { LinksGroup } from './LinksGroup';
// import { Logo } from './Logo';
import classes from './NavbarNested.module.css';

const mockExpressions = [
    {
        "Name": "exp_01",
        "File": "expressions/exp_01.exp3.json"
    },
    {
        "Name": "exp_02",
        "File": "expressions/exp_02.exp3.json"
    },
    {
        "Name": "exp_03",
        "File": "expressions/exp_03.exp3.json"
    },
    {
        "Name": "exp_04",
        "File": "expressions/exp_04.exp3.json"
    },
    {
        "Name": "exp_05",
        "File": "expressions/exp_05.exp3.json"
    },
    {
        "Name": "exp_06",
        "File": "expressions/exp_06.exp3.json"
    },
    {
        "Name": "exp_07",
        "File": "expressions/exp_07.exp3.json"
    },
    {
        "Name": "exp_08",
        "File": "expressions/exp_08.exp3.json"
    }
]

const expressionLinks = mockExpressions.map((expressionDefinition) => {
  return {label: expressionDefinition.Name, link: expressionDefinition.File}
})

// const motionLinks = 
const mockdata = [
  { 
    label: 'Expressions',
    icon: IconMoodSmile,
    initiallyOpened: true,
    links: expressionLinks
     },
  {
    label: 'Motions',
    icon: IconRun,
    initiallyOpened: true,
    links: [
      { label: 'Overview', link: '/' },
      { label: 'Forecasts', link: '/' },
      { label: 'Outlook', link: '/' },
      { label: 'Real time', link: '/' },
    ],
  },
  
];

export function NavbarNested() {
  const links = mockdata.map((item) => <LinksGroup {...item} key={item.label} />);

  return (
    <nav className={classes.navbar}>
      <div className={classes.header}>
        {/* <Group justify="space-between">
          <Logo style={{ width: rem(120) }} />
          <Code fw={700}>v3.1.2</Code>
        </Group> */}
      </div>

      <ScrollArea className={classes.links}>
        <div className={classes.linksInner}>{links}</div>
      </ScrollArea>

      {/* <div className={classes.footer}>
        <UserButton />
      </div> */}
    </nav>
  );
}