USE employee_trackerDB;

INSERT INTO departmentTbl(name)
VALUES('Development'), 
      ('Human Resourses'),
      ('Craft'), 
      ('Sales');

INSERT INTO roleTbl(title, salary, department_id)
VALUES('HR Manager', 80000, (SELECT id FROM departmentTbl WHERE name= 'Human Resourses')),
      ('Dev Manager', 120000, (SELECT id FROM departmentTbl WHERE name= 'Development')),
      ('Floor Manager', 80000, (SELECT id FROM departmentTbl WHERE name= 'Craft')),
      ('Sales Manager', 100000, (SELECT id FROM departmentTbl WHERE name= 'Sales')),
      ('Lead Dev', 100000, (SELECT id FROM departmentTbl WHERE name= 'Development')),
      ('Lead Tech', 60000, (SELECT id FROM departmentTbl WHERE name= 'Craft')),
      ('Sales Lead', 80000, (SELECT id FROM departmentTbl WHERE name= 'Sales')),
      ('HR worker', 60000, (SELECT id FROM departmentTbl WHERE name= 'Human Resourses')),
      ('Junior Dev', 80000, (SELECT id FROM departmentTbl WHERE name= 'Development')),
      ('Tech', 50000, (SELECT id FROM departmentTbl WHERE name= 'Craft')),
      ('Junior Sales', 60000, (SELECT id FROM departmentTbl WHERE name= 'Sales'));


INSERT INTO employeeTbl(first_name, last_name, role_id, manager_id)
VALUES('Jon1', 'DevMan', (SELECT id FROM roleTbl WHERE title = 'Dev Manager'), NULL),
      ('Jon2', 'HRMan', (SELECT id FROM roleTbl WHERE title = 'HR Manager'), NULL),
      ('Jon3', 'FloorMan', (SELECT id FROM roleTbl WHERE title = 'Floor Manager'), NULL),
      ('Jon4', 'SalesMan', (SELECT id FROM roleTbl WHERE title = 'Sales Manager'), NULL),
      ('Jim1', 'LeadDev', (SELECT id FROM roleTbl WHERE title = 'Lead Dev'), 1),
      ('Jim2', 'JunDev', (SELECT id FROM roleTbl WHERE title = 'Junior Dev'), 1),
      ('Jim3', 'TechLN', (SELECT id FROM roleTbl WHERE title = 'Tech'), 3);