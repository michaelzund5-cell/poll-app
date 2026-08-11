-- Optional test data for the DA checklist.

with past_survey as (
  insert into public.surveys (title, category, description, end_date)
  values (
    'Past Technology Survey',
    'Technology & Innovation',
    'Expired survey used to verify the Past Surveys tab.',
    current_date - interval '7 days'
  )
  returning id
),
past_question as (
  insert into public.questions (survey_id, text, allow_multiple, position)
  select id, 'Which technology did you use most?', false, 0
  from past_survey
  returning id
)
insert into public.answers (question_id, label, text, position)
select id, 'A', 'Angular', 0 from past_question
union all
select id, 'B', 'TypeScript', 1 from past_question;

with active_survey as (
  insert into public.surveys (title, category, description, end_date)
  values (
    'Ending Soon Technology Survey',
    'Technology & Innovation',
    'Active survey used to verify Ending Soon ordering.',
    current_date + interval '2 days'
  )
  returning id
),
active_question as (
  insert into public.questions (survey_id, text, allow_multiple, position)
  select id, 'Which topic should we explore next?', false, 0
  from active_survey
  returning id
)
insert into public.answers (question_id, label, text, position)
select id, 'A', 'Angular Signals', 0 from active_question
union all
select id, 'B', 'DevSecOps', 1 from active_question;
