select 'Rapport';
select * from crime_scene_report where date='20180115' and type='murder';
select 'Témoins';
select * from person where name like 'Annabel%' and address_street_name like 'Frank%';
select * from person where address_street_name='Northwestern Dr' order by address_number desc limit 1;

select 'interviews';
select * from interview where person_id in (16371, 14887);

select 'gym';

select * from get_fit_now_member where id like '48Z%' and membership_status='gold';

select * from person where id in (28819, 67318);
select * from drivers_license where id in (173289, 423327);

INSERT INTO solution VALUES (1, 'Jeremy Bowers');

SELECT value FROM solution;

select 'présumé coupable';
select * from interview where person_id = 67318;

select *
from person a
join drivers_license b on a.license_id = b.id
join income b on a.ssn = b.ssn
where b.gender = 'female' and b.hair_color='red' and b.car_make='Tesla';

select 'La commanditaire';

INSERT INTO solution VALUES (1, 'Miranda Priestly');
SELECT value FROM solution;
