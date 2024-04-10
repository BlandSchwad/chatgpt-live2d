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




export const Menu = ({model}) => {
 
  // const router = useRouter();
  // const {model, lipSync } = useModel();

  // useEffect(() => {
  //   if(!model) {
  //     return
 
  //   }
  // }, [model])

const motionManager = model?.internalModel.motionManager
const motionDefinitions = motionManager?.definitions  
const expressionDefinitions = motionManager?.expressionManager?.definitions

// const motions = model?.internalModel
// console.log(expressions)
// const expressionButtons = expressions?.map((exp) => (
//   <Button value={exp.Name} onClick={async (e) => {
//     // co/nsole.log(e.target.)
//     await model?.expression(exp.Name)
    
//   }}>{exp.Name}</Button>
// ))
// console.log(motionDefinitions, expressionDefinitions)

const randomExpression = async () => {
  await model?.expression()
}
// console.log()
const MotionComponent = () => {
  if(!model) {
    return 
  }
  else {
    const motionDefinitons = model?.internalModel.motionManager.definitions
    console.log(Object.entries(motionDefinitons))
    return (
      <>
      <Accordion.Item key={'motionmaster'} value={"motionmaster"}>
        <Accordion.Control>Motions</Accordion.Control>
        <Accordion.Panel>     
       
        {Object.entries(motionDefinitons).map(([key, value]) => {
          return(
          <Accordion.Item key={key} value={key}>
            <Accordion.Control>{key}</Accordion.Control>
            {/* {key} */}
              <Accordion.Panel>
                {value?.map((definition, index) => {
                  return (
                    <Accordion.Item key={definition.File} value={definition.File}>
                      <Accordion.Control>
                        {definition.File}
                      </Accordion.Control>
                      <Accordion.Panel>
                        <ActionIcon onClick={() => {
                          model.motion(key, index)
                        }} radius="xl" mr={8} color={"teal"}>
                          <IconPlayerPlay />
                        </ActionIcon>
                      </Accordion.Panel>
                    </Accordion.Item>
                  )
                })}
              </Accordion.Panel>            
          </Accordion.Item>
          )
        })}
        </Accordion.Panel>
      </Accordion.Item>
     
      </>
    )
    
  }
  

}
// console.log(expressions)
expressionDefinitions?.map((definition) => {

})
  return (
<>
<nav className={classes.navbar}>
  <div className={classes.header}>
    HEADER
  </div>

  <ScrollArea className={classes.links}>
    <ExpressionsGroup model={model} definitions={expressionDefinitions} initiallyOpened={true}/>
    <div className={classes.linksInner}> links go here</div>
  </ScrollArea>
</nav>
{/* <NavbarNested/> */}
</>  );
};
