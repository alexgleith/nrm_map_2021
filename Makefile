NLPMU_2020.geojson:
	ogr2ogr \
		NLPMU_2020.geojson \
		~/Dropbox/Work/NRM_Maps/Data/NLPMU_2020/NLPMU_2020.shp 

nrm_reg_new.json:
	geo2topo \
		NLPMU_2020.geojson \
		--quantization 1e4 > nrm_reg_new.json
