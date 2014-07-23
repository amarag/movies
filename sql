SELECT ne.nid as nid,fi.field_movie_id_value as movie_id,title, ft.field_media_type_value AS type  from node ne
	 JOIN field_data_field_media_type ft on ne.nid = ft.entity_id
	 JOIN field_data_field_movie_id fi on ne.nid = fi.entity_id
 WHERE ft.field_media_type_value = 'DVD' OR ft.field_media_type_value = 'Blu-ray' AND ne.type = 'movie'

SELECT ne.nid as nid,
	fi.field_movie_id_value as movie_id,
	title,
	ft.field_media_type_value AS type  
    , 	GROUP_CONCAT(gs.field_genres_value)
from node ne
	 left JOIN field_data_field_media_type ft on ne.nid = ft.entity_id
	 left JOIN field_data_field_movie_id fi on ne.nid = fi.entity_id
     	 left JOIN field_data_field_genres gs on gs.entity_id = ne.nid 
 WHERE ft.field_media_type_value = 'DVD' OR ft.field_media_type_value = 'Blu-ray' AND ne.type = 'movie'
group by ne.nid,fi.field_movie_id_value,title
 
 
	
