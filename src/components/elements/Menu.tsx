import { useMemo, useEffect } from "react";
import axios from "axios";
import { Text, Flex, Paper, ActionIcon, ScrollArea } from "@mantine/core";
import { useModel } from "@/hooks/useModel";
import { useRouter } from "next/router";
import { IconPlayerPlay, IconSpeakerphone } from "@tabler/icons-react";
import { Accordion, Button } from "@mantine/core";
import { AccordionControl } from "@mantine/core/lib/Accordion/AccordionControl/AccordionControl";
import { AccordionItem } from "@mantine/core/lib/Accordion/AccordionItem/AccordionItem";
import { LinksGroup } from "./LinksGroup";
import { NavbarNested } from "./NavbarNested";
import classes from './NavbarNested.module.css';
import { ExpressionsGroup } from "./ExpresionLinks";
import { MotionsGroup } from "./MotionLinks";




export const Menu = ({model}) => {
 


  return (
<>
<nav className={classes.navbar}>
  <div className={classes.header}>
    HEADER
  </div>

  <ScrollArea className={classes.links}>
    <ExpressionsGroup model={model} initiallyOpened={true}/>
    <MotionsGroup model={model}  initiallyOpened={true}/>
  </ScrollArea>
</nav>
{/* <NavbarNested/> */}
</>  );
};
