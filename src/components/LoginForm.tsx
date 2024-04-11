import { useToggle, upperFirst } from '@mantine/hooks';
import { useForm } from '@mantine/form';
import {
  TextInput,
  PasswordInput,
  Text,
  Paper,
  Group,
  PaperProps,
  Button,
  Divider,
  Checkbox,
  Anchor,
  Stack,
} from '@mantine/core';
import { redirect } from 'next/navigation'
// import { GoogleButton } from './GoogleButton';
// import { TwitterButton } from './TwitterButton';
import { useSession, signIn, signOut } from "next-auth/react"
import { GithubButton } from './elements/GithubButton';
import { signup } from '@/pages/signup/actions';
export function LoginForm(props: PaperProps) {
//   const [type, toggle] = useToggle(['login', 'register']);
// const session = useSession()


  const form = useForm({
    initialValues: {
      email: '',
      name: '',
      password: '',
      terms: true,
    },

    validate: {
      email: (val) => (/^\S+@\S+$/.test(val) ? null : 'Invalid email'),
      password: (val) => (val.length <= 6 ? 'Password should include at least 6 characters' : null),
    },
  });

  return (
    <Paper radius="md" p="xl" withBorder {...props}>
      <Text size="lg" fw={500}>
        Welcome to Mantine, {props.type} with
      </Text>

      <Group grow mb="md" mt="md">
        <GithubButton  onClick={() => {signIn('github')}} radius={"xl"}>Github</GithubButton>
        {/* {session && <div>signed in as {session.user?.email}</div>} */}
        {/* <GoogleButton radius="xl">Google</GoogleButton>
        <TwitterButton radius="xl">Twitter</TwitterButton> */}
      </Group>

      <Divider label="Or continue with email" labelPosition="center" my="lg" />

      <form onSubmit={form.onSubmit((values) => {
        if(props.type === 'register') {
            console.log(form.values)
            signup(form.values)
            return
        } 
        signIn('credentials', values)})}>
        <Stack>
          {props.type === 'register' && (
            <TextInput
              label="Name"
              placeholder="Your name"
              value={form.values.name}
              onChange={(event) => form.setFieldValue('name', event.currentTarget.value)}
              radius="md"
            />
          )}

          <TextInput
            required
            label="Email"
            placeholder="hello@mantine.dev"
            value={form.values.email}
            onChange={(event) => form.setFieldValue('email', event.currentTarget.value)}
            error={form.errors.email && 'Invalid email'}
            radius="md"
          />

          <PasswordInput
            required
            label="Password"
            placeholder="Your password"
            value={form.values.password}
            onChange={(event) => form.setFieldValue('password', event.currentTarget.value)}
            error={form.errors.password && 'Password should include at least 6 characters'}
            radius="md"
          />

          {props.type === 'register' && (
            <Checkbox
              label="I accept terms and conditions"
              checked={form.values.terms}
              onChange={(event) => form.setFieldValue('terms', event.currentTarget.checked)}
            />
          )}
        </Stack>

        <Group justify="space-between" mt="xl">
          <Anchor component="button" type="button" c="dimmed" onClick={ async () => { await redirect('/signup')}} size="xs">
            {props.type === 'register'
              ? 'Already have an account? Login'
              : "Don't have an account? Register"}
          </Anchor>
          <Button type="submit" radius="xl">
            {upperFirst(props.type)}
          </Button>
          {/* <Button type='' radius='xl' onClick={async () => {
            await signOut()

          }}>
            Sign Out
          </Button> */}
        </Group>
      </form>
    </Paper>
  );
}