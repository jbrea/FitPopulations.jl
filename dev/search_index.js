var documenterSearchIndex = {"docs":
[{"location":"reference/#Reference","page":"Reference","title":"Reference","text":"","category":"section"},{"location":"reference/#Functions-to-extend-with-a-new-model","page":"Reference","title":"Functions to extend with a new model","text":"","category":"section"},{"location":"reference/","page":"Reference","title":"Reference","text":"FitPopulations.initialize!\nFitPopulations.parameters\nFitPopulations.logp\nFitPopulations.sample","category":"page"},{"location":"reference/#FitPopulations.initialize!","page":"Reference","title":"FitPopulations.initialize!","text":"initialize!(model, parameters)\n\nInitalizes the state of the model.\n\n\n\n\n\n","category":"function"},{"location":"reference/#FitPopulations.parameters","page":"Reference","title":"FitPopulations.parameters","text":"parameters(model)\n\nReturns a named tuple.\n\n\n\n\n\n","category":"function"},{"location":"reference/#FitPopulations.logp","page":"Reference","title":"FitPopulations.logp","text":"logp(data, model, parameters)\n\nReturns log P(datamodel parameters).\n\n\n\n\n\n","category":"function"},{"location":"reference/#FitPopulations.sample","page":"Reference","title":"FitPopulations.sample","text":"sample(rng, data, model, parameters; kw...)\n\nTakes already generated data as input and returns a new data point. This function is called in the simulate function. Keyword arguments are passed through the simulate function.\n\n\n\n\n\n","category":"function"},{"location":"reference/#Population-model","page":"Reference","title":"Population model","text":"","category":"section"},{"location":"reference/","page":"Reference","title":"Reference","text":"FitPopulations.PopulationModel","category":"page"},{"location":"reference/#FitPopulations.PopulationModel","page":"Reference","title":"FitPopulations.PopulationModel","text":"PopulationModel(model; prior = DiagonalNormalPrior(), shared = ())\n\nWrap a model for estimating population parameters. Shared parameters should be given as a tuple of symbols.\n\n\n\n\n\n","category":"type"},{"location":"reference/#Fitting","page":"Reference","title":"Fitting","text":"","category":"section"},{"location":"reference/","page":"Reference","title":"Reference","text":"FitPopulations.maximize_logp","category":"page"},{"location":"reference/#FitPopulations.maximize_logp","page":"Reference","title":"FitPopulations.maximize_logp","text":"maximize_logp(data, model, parameters = ComponentArray(parameters(model));\n              fixed = (;)\n              coupled = [],\n              optimizer = default_optimizer(model, parameters, fixed),\n              lambda_l2 = 0.,\n              verbosity = 1, print_interval = 10,\n              return_g! = false,\n              evaluation = (;),\n              kw...)\n\n\n\n\n\n","category":"function"},{"location":"reference/#Simulation","page":"Reference","title":"Simulation","text":"","category":"section"},{"location":"reference/","page":"Reference","title":"Reference","text":"FitPopulations.simulate\nFitPopulations.logp_tracked","category":"page"},{"location":"reference/#FitPopulations.simulate","page":"Reference","title":"FitPopulations.simulate","text":"simulate(\n    model,\n    parameters;\n    n_steps,\n    stop,\n    init,\n    tracked,\n    rng,\n    kw...\n)\n\n\nReturns a named tuple (; data, logp). stop(data, i) is a boolean function that depends on the sequence of simulated data and the iteration counter i. If tracked = true the state of the model is saved for every step in the simulation. Additional keyword arguments kw are passed to the sample function.\n\n\n\n\n\n","category":"function"},{"location":"reference/#FitPopulations.logp_tracked","page":"Reference","title":"FitPopulations.logp_tracked","text":"logp_tracked(data, model, parameters)\n\n\nReturns a names tuple (; history, logp). In the history the state of the model is saved for every step.\n\n\n\n\n\n","category":"function"},{"location":"reference/#Evaluation","page":"Reference","title":"Evaluation","text":"","category":"section"},{"location":"reference/","page":"Reference","title":"Reference","text":"FitPopulations.mc_marginal_logp\nFitPopulations.BIC_int","category":"page"},{"location":"reference/#FitPopulations.mc_marginal_logp","page":"Reference","title":"FitPopulations.mc_marginal_logp","text":"mc_marginal_logp(data, model::PopulationModel, params;\n                 repetitions = 20, n_samples = 10^4, rng = Random.default_rng())\n\nEstimate the marginal log probability of the data given a model by sampling from the population.\n\n\n\n\n\n","category":"function"},{"location":"reference/#FitPopulations.BIC_int","page":"Reference","title":"FitPopulations.BIC_int","text":"BIC_int(data, model, params; kw...)\n\n\nEstimate the Bayesian Information Criterion by sampling from the population. Keyword arguments kw are passed to mc_marginal_logp.\n\n\n\n\n\n","category":"function"},{"location":"reference/#Derivatives","page":"Reference","title":"Derivatives","text":"","category":"section"},{"location":"reference/","page":"Reference","title":"Reference","text":"FitPopulations.gradient_logp\nFitPopulations.hessian_logp","category":"page"},{"location":"reference/#FitPopulations.gradient_logp","page":"Reference","title":"FitPopulations.gradient_logp","text":"gradient_logp(data, model, parameters)\n\n\nCompute the gradient of logp.\n\n\n\n\n\n","category":"function"},{"location":"reference/#FitPopulations.hessian_logp","page":"Reference","title":"FitPopulations.hessian_logp","text":"hessian_logp(data, model, parameters; ad = :ForwardDiff)\n\nCompute the hessian of logp.\n\n\n\n\n\n","category":"function"},{"location":"#FitPopulations","page":"Home","title":"FitPopulations","text":"","category":"section"},{"location":"#Example","page":"Home","title":"Example","text":"","category":"section"},{"location":"#Model-Definition","page":"Home","title":"Model Definition","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"For a sequence of binary values y = (y_1 ldots y_T) we define a habituating biased coin model with probability P(y) = prod_t=1^TP(y_tw_t-1) with w_t = w_t-1 + eta (y_t-1 - sigma(w_t-1)), where w_0 and eta are parameters of the model and sigma(w) = 1(1 + exp(-w)).","category":"page"},{"location":"","page":"Home","title":"Home","text":"We define the model HabituatingBiasedCoin with state variable w and extend the functions parameters, initialize!, logp and sample from FitPopulations.","category":"page"},{"location":"","page":"Home","title":"Home","text":"using FitPopulations\nusing ConcreteStructs, Distributions\n\n@concrete struct HabituatingBiasedCoin\n    w\nend\nHabituatingBiasedCoin() = HabituatingBiasedCoin(Base.RefValue(0.))\n\nfunction FitPopulations.initialize!(m::HabituatingBiasedCoin, parameters)\n    m.w[] = parameters.w₀\nend\n\nFitPopulations.parameters(::HabituatingBiasedCoin) = (; w₀ = 0., η = 0.)\n\nsigmoid(w) = 1/(1 + exp(-w))\n\nfunction FitPopulations.logp(data, m::HabituatingBiasedCoin, parameters)\n    initialize!(m, parameters)\n    η = parameters.η\n    logp = 0.\n    for yₜ in data\n        ρ = sigmoid(m.w[])\n        logp += logpdf(Bernoulli(ρ), yₜ)\n        m.w[] += η * (yₜ - ρ)\n    end\n    logp\nend\n\nfunction FitPopulations.sample(rng, ::Any, m::HabituatingBiasedCoin, ::Any)\n    rand(rng) ≤ sigmoid(m.w[])\nend","category":"page"},{"location":"#Generating-data","page":"Home","title":"Generating data","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"Let us generate 5 sequences of 30 steps with this model.","category":"page"},{"location":"","page":"Home","title":"Home","text":"import FitPopulations: simulate\n\nmodel = HabituatingBiasedCoin()\nparams = (; w₀ = .3, η = .1)\ndata = [simulate(model, params, n_steps = 30).data for _ in 1:5]","category":"page"},{"location":"#Fitting-a-single-model","page":"Home","title":"Fitting a single model","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"First we check, if gradients are properly computed for our model.","category":"page"},{"location":"","page":"Home","title":"Home","text":"import FitPopulations: gradient_logp\ngradient_logp(data[1], model, params)","category":"page"},{"location":"","page":"Home","title":"Home","text":"If this fails, it is recommended to check that logp does not allocate, e.g. with","category":"page"},{"location":"","page":"Home","title":"Home","text":"using BenchmarkTools\n@benchmark logp($(data[1]), $model, $params)","category":"page"},{"location":"","page":"Home","title":"Home","text":"We also check if Hessians are properly computed.","category":"page"},{"location":"","page":"Home","title":"Home","text":"import FitPopulations: hessian_logp\nhessian_logp(data[1], model, params)","category":"page"},{"location":"","page":"Home","title":"Home","text":"This may fail, if the model is too restrictive in its type parameters.","category":"page"},{"location":"","page":"Home","title":"Home","text":"If everything works fine we run the optimizer:","category":"page"},{"location":"","page":"Home","title":"Home","text":"import FitPopulations: maximize_logp\nresult = maximize_logp(data[1], model)","category":"page"},{"location":"","page":"Home","title":"Home","text":"To inspect the state of the fitted model we can run","category":"page"},{"location":"","page":"Home","title":"Home","text":"import FitPopulations: logp_tracked\nlogp_tracked(data[1], model, result.parameters).history","category":"page"},{"location":"","page":"Home","title":"Home","text":"We can also fit with some fixed parameters.","category":"page"},{"location":"","page":"Home","title":"Home","text":"result = maximize_logp(data[1], model, fixed = (; η = 0.))\nresult.parameters","category":"page"},{"location":"","page":"Home","title":"Home","text":"or with coupled parameters","category":"page"},{"location":"","page":"Home","title":"Home","text":"result = maximize_logp(data[1], model, coupled = [(:w₀, :η)])\nresult.parameters","category":"page"},{"location":"#Fitting-a-population-model","page":"Home","title":"Fitting a population model","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"Now we fit all data samples with approximate EM, assuming a diagonal normal prior over the parameters.","category":"page"},{"location":"","page":"Home","title":"Home","text":"import FitPopulations: PopulationModel\npop_model1 = PopulationModel(model)\nresult1 = maximize_logp(data, pop_model1)\nresult1.population_parameters","category":"page"},{"location":"","page":"Home","title":"Home","text":"Let us compare this to a model where all samples are assumed to be generated from the same parameters, i.e. the variance of the normal prior is zero.","category":"page"},{"location":"","page":"Home","title":"Home","text":"pop_model2 = PopulationModel(model, shared = (:w₀, :η))\nresult2 = maximize_logp(data, pop_model2)\nresult2.population_parameters","category":"page"},{"location":"","page":"Home","title":"Home","text":"To compare the models we look at the approximate BIC","category":"page"},{"location":"","page":"Home","title":"Home","text":"import FitPopulations: BIC_int\n(model1 = BIC_int(data, pop_model1, result1.population_parameters, repetitions = 1),\n model2 = BIC_int(data, pop_model2, result2.population_parameters))","category":"page"},{"location":"","page":"Home","title":"Home","text":"We see that the second model without variance of the prior has the lower BIC. This is not surprising, given that the data was generated with identical parameters.","category":"page"}]
}
