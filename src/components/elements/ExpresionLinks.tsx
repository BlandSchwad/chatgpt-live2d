import { useState } from 'react';
import { Group, Box, Collapse, ThemeIcon, Text, UnstyledButton, rem, Col } from '@mantine/core';
import classes from './LinksGroup.module.css';
import { IconChevronRight, IconMoodSmile } from '@tabler/icons-react';
// import { useModel } from '@/hooks/useModel';


interface ExpressionsGroupProps {
    model : any
    definitions: { Name: string; File: string; }[]
    initiallyOpened?: boolean
}

export function ExpressionsGroup(props : ExpressionsGroupProps) {
    // console.log('express props', props.definitions)
    // const {model} = useModel()
    const [opened, setOpened] = useState(props.initiallyOpened || false)
    const items = (props.definitions.length > 0 ? props.definitions : []).map((definition, index) => {
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
               <Group justify='space-between' gap={0}>
                   <Box style={{ display: 'flex', alignItems: 'center' }}>
                       <ThemeIcon variant="light" size={30}>
                           <IconMoodSmile style={{ width: rem(18), height: rem(18) }} />
                       </ThemeIcon>
                       <Box ml="md">Expressions</Box>
                   </Box> {props.definitions.length > 0  &&
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
           {props.definitions.length > 0 ? <Collapse in={opened}>{items}</Collapse> : null}
       </>
   )
    
}