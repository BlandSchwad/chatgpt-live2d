import { useState } from 'react';
import { Group, Box, Collapse, ThemeIcon, Text, UnstyledButton, rem, Col } from '@mantine/core';
import classes from './LinksGroup.module.css';
import { IconChevronRight, IconMoodSmile } from '@tabler/icons-react';
import { Live2DExpression, Live2DModel } from 'pixi-live2d-display';
// import { useModel } from '@/hooks/useModel';


interface ExpressionsGroupProps {
    model : Live2DModel
    initiallyOpened?: boolean
}
interface ExpressionDefinition {
    File: string
    Name: string

}
export function ExpressionsGroup(props : ExpressionsGroupProps) {
    const defs = props.model.internalModel.motionManager.expressionManager?.definitions as ExpressionDefinition[]
    // console.log(defs)
    // console.log('express props', defs)
    // const {model} = useModel()
    const [opened, setOpened] = useState(props.initiallyOpened || false)
    const items = (defs.length > 0 ? defs : []).map((definition, index) => {
        return (
        <Text<'a'>
            component="a"
            className={classes.link}
            key={definition.File}
            onClick={async (event) => {
                console.log("clicked", index)
                await props.model.expression(index)
            }}
            >
                {definition.Name}
            </Text>
        )
    })

    return(  
        <>
           <UnstyledButton onClick={() => setOpened((o) => !o)} className={classes.control}>
               <Group>
                   <Box style={{ display: 'flex', alignItems: 'center' }}>
                       <ThemeIcon variant="light" size={30}>
                           <IconMoodSmile style={{ width: rem(18), height: rem(18) }} />
                       </ThemeIcon>
                       <Box ml="md">Expressions</Box>
                   </Box> {defs.length > 0  &&
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
           {defs.length > 0 ? <Collapse in={opened}>{items}</Collapse> : null}
       </>
   )
    
}