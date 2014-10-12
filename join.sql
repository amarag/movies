SELECT ne.nid as nid, title, fi.field_movie_id_value as movie_id,
 (select GROUP_CONCAT(gs.field_genres_value) from field_data_field_genres gs where gs.entity_id = nid) as genres,
 (select GROUP_CONCAT(ft.field_media_type_value) from field_data_field_media_type ft where ne.nid = ft.entity_id)  AS mediatypes
from node ne
 LEFT JOIN field_data_field_movie_id fi on ne.nid = fi.entity_id
 LEFT JOIN field_data_field_media_type ft on ne.nid = ft.entity_id
WHERE (ft.field_media_type_value = 'DVD' OR ft.field_media_type_value = 'Blu-ray') AND ne.type = 'movie'


 LEFT JOIN field_data_field_genres gs on gs.entity_id = ne.nid

,title, ft.field_media_type_value AS type
