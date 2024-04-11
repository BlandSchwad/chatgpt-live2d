import { useState } from 'react';
import { Group, Box, Collapse, ThemeIcon, Text, UnstyledButton, rem, Col, ActionIcon } from '@mantine/core';
import classes from './LinksGroup.module.css';
import { IconChevronRight, IconPlayerPlay, IconRun } from '@tabler/icons-react';
import { Live2DModel } from 'pixi-live2d-display';

interface MotionsGroupProps {
    model: Live2DModel;
    initiallyOpened?: boolean
}


export function MotionsGroup(props: MotionsGroupProps) {
    const [opened, setOpened] = useState(props.initiallyOpened || false)
    const motionManager = props.model.internalModel.motionManager
    const defs = Object.entries(motionManager.definitions)
    const pingas = defs.map(([groupName, definitions]) => {
        
        return (
            <div key={'motiongroup' + groupName}>
            <Text key={groupName}>
                {groupName}
               
               
            </Text>
            <Box>
                { definitions.map((motion, index)=> {
                    // console.log(motion, index)
                return (
                    <div key={motion.File + index}>
                        {motion.File}
                        {motion.Sound}
                        <ActionIcon 
                           radius="xl"
                           mr={8}
                           color={"teal"}
                           onClick={() => 
                            props.model.motion(groupName, index )
                           }
                           >
                            <IconPlayerPlay size={24} color="teal"/>
                        </ActionIcon>
                    </div>)
               })}
                </Box>
            </div>

        )
    })
    // console.log('defs,', defs)
    // const items = (props.definitions.length > 0 ? props.definitions : []).map((definition, index) => {
    //     return (
    //     <Text<'a'>
    //         component="a"
    //         className={classes.link}
    //         key={definition.File}
    //         onClick={async (event) => {
    //             console.log("clicked", index)
    //             await props.model.expression(index)
    //         }}
    //         >
    //             {definition.Name}
    //         </Text>
    //     )
    // })

    return(  
        <>
           <UnstyledButton onClick={() => setOpened((o) => !o)} className={classes.control}>
               <Group justify='space-between' gap={0}>
                   <Box style={{ display: 'flex', alignItems: 'center' }}>
                       <ThemeIcon variant="light" size={30}>
                           <IconRun style={{ width: rem(18), height: rem(18) }} />
                       </ThemeIcon>
                       <Box ml="md">Motions</Box>
                   </Box> {true  &&
                   <IconChevronRight className={classes.chevron}
                   stroke={1.5}
                   style={{
                       width: rem(16),
                       height: rem(16),
                       transform: opened ? 'rotate(90deg)' : 'none',
                     }}
                     />
                   }
               </Group> 
           </UnstyledButton>
           {defs.length > 0 ? <Collapse in={opened}>{pingas}</Collapse> : null}
       </>
   )
    
}