import fastify from 'fastify'
import {
  serializerCompiler,
  validatorCompiler,
  type ZodTypeProvider,
} from 'fastify-type-provider-zod'
import { createGoal } from '../functions/create-goal'
import z from 'zod'
import { getWeekPendingGoals } from '../functions/get-week-pending-goals'
import { createGoalCompletion } from '../functions/create-goal-completion'
import { createGoalRoute } from './routes/create-goal'
import { createGoalCompletionRoute } from './routes/create-completion'
import { getPendingGoalsRoute } from './routes/get-pending-goals'
import { getWeekSummary } from '../functions/get-week-summary'
import { getWeekSummaryRoute } from './routes/get-week-summary'
import fastifyCors from '@fastify/cors'

const app = fastify().withTypeProvider<ZodTypeProvider>()

app.register(fastifyCors, {
  origin: '*',
})

app.setValidatorCompiler(validatorCompiler)
app.setSerializerCompiler(serializerCompiler)

app.register(createGoalRoute)
app.register(createGoalCompletionRoute)
app.register(getPendingGoalsRoute)
app.register(getWeekSummaryRoute)

app.listen({ port: 3333 }).then(() => {
  console.log('HTTP server running!')
})
