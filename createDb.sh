echo "Enter blank space for password or update database.json config once set"
createuser -P -s -e scaffoldAdmin
createdb -O scaffoldAdmin scaffold_sample_db